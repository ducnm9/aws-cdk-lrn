import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib/core';
import { Duration } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
          expiration: Duration.days(expiration)
        }]
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an S3 bucket 3 ways:
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          status: 'Enabled',
          expirationInDays: 1
        }]
      }
    })

    new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
          expiration: Duration.days(2)
        }]
    });

    new L3Bucket(this, 'MyL3Bucket', 3);

  }
}
