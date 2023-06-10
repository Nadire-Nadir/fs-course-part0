const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://HyFullstack:${password}@cluster0.wftbwda.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Phonebook", personSchema);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
      mongoose.connection.close();
    });
  });
} else if (process.argv.length === 5) {
  Person.create({ name: process.argv[3], number: process.argv[4] }).then(
    (result) => {
      console.log(`added ${result.name} number ${result.number} to phobebook`);
      mongoose.connection.close();
    }
  );
} else {
    console.log("invalid command");
    mongoose.connection.close();

}
