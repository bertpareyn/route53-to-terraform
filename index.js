#!/usr/bin/env node
let path = require('path');
let fs = require('fs');

// Import record types
let aRecord = require('./recordtypes/a.js');
let mxRecord = require('./recordtypes/mx.js');
let txtRecord = require('./recordtypes/txt.js');
let cnameRecord = require('./recordtypes/cname.js');
let nsRecord = require('./recordtypes/ns.js');
let aaaaRecord = require('./recordtypes/aaaa.js');
let soaRecord = require('./recordtypes/soa.js');


//////////////////////
// HANDLE ARGUMENTS //
//////////////////////

var argv = require('optimist')
  .usage('Usage: $0 -i path_to_inputfile.json -o path_to_outputfile.tf -z hosted_zone_id')

  .alias('i', 'input')
  .describe('i', 'The input json file')
  .demand('i')

  .alias('o', 'output')
  .describe('o', 'The output Terraform file')
  .demand('o')

  .alias('z', 'zoneid')
  .describe('z', 'The ID of the zone to create these records in')

  .argv;

// Display the help if requested
if (argv.h) {
  require('optimist').showHelp();
  return process.exit(0);
}


////////////////
// READ INPUT //
////////////////

let intputFilePath = argv.i;
let outputFilePath = argv.o;
let zoneId = argv.z || '<replacemewithroute53hostedzoneid>';

// Read the input file and parse the JSON
let inputFileContent = JSON.parse(fs.readFileSync(intputFilePath));


/////////////////
// PARSE INPUT //
/////////////////
let outputFileContent = '';
let recordsParsed = 0;

// Parse each record
for (var record of inputFileContent.ResourceRecordSets) {
  switch (record.Type) {
    case 'A':
      outputFileContent += aRecord.execute(record, zoneId);
      recordsParsed++;
      break;
    case 'MX':
      outputFileContent += mxRecord.execute(record, zoneId);
      recordsParsed++;
      break;
    case 'TXT':
      outputFileContent += txtRecord.execute(record, zoneId);
      recordsParsed++;
      break;
    case 'CNAME':
      outputFileContent += cnameRecord.execute(record, zoneId);
      recordsParsed++;
      break;
    case 'NS':
      outputFileContent += nsRecord.execute(record, zoneId);
      recordsParsed++;
      break;
    case 'AAAA':
      outputFileContent += aaaaRecord.execute(record, zoneId);
      recordsParsed++;
      break;
    case 'SOA':
      outputFileContent += soaRecord.execute(record, zoneId);
      recordsParsed++;
      break;
  }
}

//////////////////
// WRITE OUTPUT //
//////////////////

fs.writeFileSync(outputFilePath, outputFileContent);
console.log(`Parsed ${recordsParsed} Route 53 Records into Terraform DSL at ${outputFilePath}`);
