import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {

  private stackSuffix: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initializSuffix();

    const photosBucket =  new Bucket(this, "PhotosBucket2", {
      bucketName: `my-photos-bucket-${this.stackSuffix}`,
    });

    new cdk.CfnOutput(this, "photos-bucket", {
      value: photosBucket.bucketName,
      exportName: "photos-bucket",
    });
  }

  // private overrideLogicalId(resource: cdk.CfnResource, newLogicalId: string) {
  //   const cfnResource = resource as cdk.CfnResource;
  //   (cfnResource.node.defaultChild as CfnBucket).overrideLogicalId(newLogicalId);
  // }

  private initializSuffix(){
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
    this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split("-", shortStackId));
  }


}
