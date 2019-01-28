# route53-to-terraform
The goal of this package is to convert your Route 53 records into Terraform syntax so they can be managed with Terraform.

## Supported records
The following records have basic support as outlined in https://www.terraform.io/docs/providers/aws/r/route53_record.html:

- A
- AAAA
- CNAME
- MX
- NS
- SOA
- TXT


## Usage

- Export Route 53 configuration with the AWS Cli: `aws route53 list-resource-record-sets --profile your_credentials_profile --hosted-zone-id hosted_zone_id > ~/Desktop/route53_export.json`
- Install dependencies with `npm i`
- Check out usage by running `node ./index.js`
```javascript
Usage: node ./index.js -i path_to_inputfile.json -o path_to_outputfile.tf -z hosted_zone_id

Options:
  -i, --input   The input json file                            [required]
  -o, --output  The output Terraform file                      [required]
  -z, --zoneid  The ID of the zone to create these records in

```
- Taking previous export example, run as: `node ./index.js -i ~/Desktop/route53_export.json -o ~/Desktop/route53_export.tf`