let utils = require('./utils.js');

let execute = module.exports.execute = function(json, zone_id) {
    return `resource "aws_route53_record" "${utils.generateResourceName(json)}" {
        ${utils.generateAlias(json)}
        name    = "${json.Name}"
        type    = "${json.Type}"
        zone_id = "${zone_id}"
        ${utils.generateResourceRecords(json)}
    }`
}