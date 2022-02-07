import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline } from 'aws-cdk-lib/aws-events-targets';
import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub('najeedabdul/aws-cdk-pipeline', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      }),
    });
    }
  }
