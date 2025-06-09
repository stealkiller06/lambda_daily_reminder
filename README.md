# Daily Reminder Lambda

A serverless application built with AWS CDK that sends automated daily reminders via email using AWS Lambda and Amazon SES.

## Architecture

The application consists of the following AWS components:

- **AWS Lambda**: Executes the reminder logic
- **Amazon EventBridge**: Triggers the Lambda function every 5 minutes
- **Amazon SES**: Sends the reminder emails
- **AWS CDK**: Infrastructure as Code (IaC) for deployment

## Prerequisites

- Node.js 22.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)
- An AWS account with appropriate permissions
- Verified email addresses in Amazon SES (if in sandbox mode)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DailyReminderLambda
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Deploy to AWS:
```bash
cdk deploy
```

## Project Structure

```
DailyReminderLambda/
├── lib/
│   └── daily_reminder_lambda-stack.ts   # Main CDK stack definition
├── lambda/
│   └── handler.ts                       # Lambda function code
├── bin/
│   └── daily_reminder_lambda.ts         # CDK app entry point
└── cdk.json                            # CDK configuration
```

## Configuration

The Lambda function uses the following environment variables:

- `REGION`: AWS region (default: us-east-1)

## IAM Permissions

The Lambda function is granted the following permissions:
- `ses:SendEmail`
- `ses:SendRawEmail`

## Schedule

The reminder function is configured to run every 5 minutes using an EventBridge (CloudWatch Events) rule with a cron expression.

## Development

To make changes to the project:

1. Modify the CDK stack in `lib/daily_reminder_lambda-stack.ts`
2. Update the Lambda function code in `lambda/handler.ts`
3. Build and deploy:
```bash
npm run build
cdk deploy
```

## Useful Commands

* `npm run build`   - compile typescript to js
* `npm run watch`   - watch for changes and compile
* `npm run test`    - perform the jest unit tests
* `cdk deploy`      - deploy this stack to your default AWS account/region
* `cdk diff`        - compare deployed stack with current state
* `cdk synth`       - emits the synthesized CloudFormation template

## Security Considerations

- Ensure your SES account is out of sandbox mode for production use
- Review and adjust the IAM permissions as needed
- Monitor Lambda execution logs in CloudWatch
- Consider implementing email sending limits


