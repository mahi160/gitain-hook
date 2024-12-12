const templatePrompt = async () => {
  const templateOptions = ["questionpro-fe", "questionpro-be"];
  templateOptions.forEach((template, index) => {
    console.log(`${index + 1}. ${template}`);
  });
  const template = await inquirer.prompt({
    type: "list",
    name: "template",
    message: "Select your template:",
    choices: templateOptions,
  });
  return template.template
};

// Add config files
const updateOrCreateFile = async (file, template) => {
  if (fs.existsSync(file)) {
    console.log(pc.yellow(`File ${file} already exists.`));
    fs.renameSync(file, `${file}.${new Date()}.bak`);
    fs.writeSync(file, `/* Previous configuration backed up */\n`);
  } else {
    console.log('Creating file "' + file + '"');
    fs.writeFileSync(file, `/* Configuration file created by gitain-hook */\n`);
  }

  fs.appendFileSync(file, fs.readFileSync(template, "utf8"));
};