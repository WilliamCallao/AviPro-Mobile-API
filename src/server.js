const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`         ) (`);
  console.log(`        (   ) )`);
  console.log(`         ) ( (`);
  console.log(`         ) ( (`);
  console.log(`       _______)_`);
  console.log(`    .-'---------|`);
  console.log(`   ( c|         |`);
  console.log(`    '-.         |`);
  console.log(`      '_________'`);
  console.log(`       '-------'`);
});
