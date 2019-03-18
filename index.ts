const args = require('gar')(process.argv.slice(2));
const package = require('./package.json');
const fs = require('fs');
const { organizeCode } = require('./vs-code-typescript-class-organizer/extension');

if (args.h || args.help) {
  console.log(`${package.name}#${package.version}
    You can use next flags:
      [fileName]  Name of file to process. Required param.
      --useRegions   When true regions surounding member groups are added. True by default
      --addPublicModifierIfMissing  When true public access modifier is added. True by default.
      --addRegionIdentation When true regions are idented with class members. True by default.
      --addRegionCaptionToRegionEnd When true region caption is added to region end as well. True by default.
      --groupPropertiesWithDecorators
  `);
  process.exit();
}

const [fileName] = args._;
if (!fileName) {
  console.error('Please specify file name as first param');
  process.exit(2);
}

try {
  const fileContent = fs.readFileSync(`${fileName}`).toString();
  const organizedCode = organizeCode(fileContent, fileName);
  fs.writeFileSync(fileName, organizedCode);
} catch (err) {
  console.error('Something went wrong', err.message || err);
  process.exit(3);
}
