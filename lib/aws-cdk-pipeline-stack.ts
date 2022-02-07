import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const pipeline = 
      new CodePipeline(this, 'Pipeline', {
        pipelineName: 'TestPipeline',
        synth: new ShellStep('Synth',{
          input: CodePipelineSource.gitHub('najeedabdul/aws-cdk-pipeline', 'master'),
          commands: ['npm ci', 'npm run build', 'npx cdk synth']
        }),
      });

      const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
        env: {account: "343962227496", region: "us-east-1"}
      }))

      testingStage.addPost(new ManualApprovalStep('Manual approbal before production'));

      const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
        env: {account: "343962227496", region: "us-east-1"}
      }))

      }
    }