import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { Code, Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";

export class PhotosHandlerStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const targetBucket = cdk.Fn.importValue('photos-bucket');

    new LambdaFunction(this, "PhotosHandler", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
        exports.handler = async function(event) {
          console.log("Hello: " + process.env.TARGET_BUCKET);
        }
      `),
      environment: {
        TARGET_BUCKET: targetBucket,
      },
    });
  }
}
