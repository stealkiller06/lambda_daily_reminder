import * as cdk from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class DailyReminderLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const reminderFunction = new NodejsFunction(this, 'DailyReminderFunction', {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lambda/handler.ts'),
      handler: 'handler',
      environment: {
        REGION: 'us-east-1',
        EMAIL_SOURCE: 'noreply@example.com',
      },
    });

    reminderFunction.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*'],
    })); 

    new cdk.aws_events.Rule(this, 'DailyReminderRule', {
      schedule: cdk.aws_events.Schedule.cron({
        minute: '*/5',
      }),
      targets: [new cdk.aws_events_targets.LambdaFunction(reminderFunction)],
    });




    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'DailyReminderLambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
