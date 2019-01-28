let generateResourceName = exports.generateResourceName = function(json) {
    return `${json.Type.toLowerCase()}_${json.Name.replace(/\./g,'_')}`
}

let generateAlias = exports.generateAlias = function(json) {
    if (json.AliasTarget) {
        return `alias {
            name                   = "${json.AliasTarget.DNSName}"
            zone_id                = "${json.AliasTarget.HostedZoneId}"
            evaluate_target_health = ${json.AliasTarget.EvaluateTargetHealth}
        }`
    }
    return '';
}

let generateResourceRecords = exports.generateResourceRecords = function(json) {
    if (json.ResourceRecords) {
        return `records = [${json.ResourceRecords.map(r => `${r.Value.startsWith('"') ? r.Value : '"' + r.Value + '"'}`).toString()}]`;
    }
    return '';
}

let generateTTL = exports.generateTTL = function(json) {
    if (json.TTL) {
        return `ttl     = "${json.TTL}"`
    }
    return '';
}
