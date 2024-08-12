// insertDummyData.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://singhalmanas20:Rummy123@cluster0.lttbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const itemSchema = new mongoose.Schema({
    date: Date,
    time: String,
    XA: String,
    XB: String,
    XC: String,
    XD: String,
    XE: String,
    XF: String,
    XG: String,
    XH: String,
    XI: String,
    XJ: String,
  });

const Item = mongoose.model('Item', itemSchema);

const dummyData = [
    { date: new Date('2024-08-07'), time: '09:00 AM', XA: 'XA18', XB: 'XB53', XC: 'XC77', XD: 'XD42', XE: 'XE29', XF: 'XF12', XG: 'XG18', XH: 'XH54', XI: 'XI10', XJ: 'XJ12' },
    { date: new Date('2024-08-07'), time: '09:15 AM', XA: 'XA52', XB: 'XB65', XC: 'XC64', XD: 'XD57', XE: 'XE10', XF: 'XF75', XG: 'XG98', XH: 'XH61', XI: 'XI32', XJ: 'XJ23' },
    { date: new Date('2024-08-07'), time: '09:30 AM', XA: 'XA14', XB: 'XB23', XC: 'XC44', XD: 'XD31', XE: 'XE85', XF: 'XF22', XG: 'XG39', XH: 'XH47', XI: 'XI20', XJ: 'XJ18' },
    { date: new Date('2024-08-07'), time: '09:45 AM', XA: 'XA36', XB: 'XB75', XC: 'XC56', XD: 'XD22', XE: 'XE77', XF: 'XF34', XG: 'XG12', XH: 'XH66', XI: 'XI28', XJ: 'XJ45' },
    { date: new Date('2024-08-07'), time: '10:00 AM', XA: 'XA29', XB: 'XB81', XC: 'XC39', XD: 'XD54', XE: 'XE43', XF: 'XF61', XG: 'XG24', XH: 'XH83', XI: 'XI15', XJ: 'XJ67' },
    { date: new Date('2024-08-07'), time: '10:15 AM', XA: 'XA48', XB: 'XB29', XC: 'XC55', XD: 'XD18', XE: 'XE62', XF: 'XF11', XG: 'XG33', XH: 'XH72', XI: 'XI20', XJ: 'XJ38' },
    { date: new Date('2024-08-07'), time: '10:30 AM', XA: 'XA61', XB: 'XB48', XC: 'XC77', XD: 'XD23', XE: 'XE55', XF: 'XF40', XG: 'XG19', XH: 'XH68', XI: 'XI29', XJ: 'XJ57' },
    { date: new Date('2024-08-07'), time: '10:45 AM', XA: 'XA54', XB: 'XB72', XC: 'XC41', XD: 'XD61', XE: 'XE35', XF: 'XF13', XG: 'XG24', XH: 'XH57', XI: 'XI32', XJ: 'XJ14' },
    { date: new Date('2024-08-07'), time: '11:00 AM', XA: 'XA23', XB: 'XB64', XC: 'XC51', XD: 'XD18', XE: 'XE74', XF: 'XF27', XG: 'XG30', XH: 'XH41', XI: 'XI18', XJ: 'XJ66' },
    { date: new Date('2024-08-07'), time: '11:15 AM', XA: 'XA37', XB: 'XB90', XC: 'XC27', XD: 'XD62', XE: 'XE22', XF: 'XF54', XG: 'XG16', XH: 'XH30', XI: 'XI25', XJ: 'XJ39' },
    { date: new Date('2024-08-07'), time: '11:30 AM', XA: 'XA49', XB: 'XB55', XC: 'XC82', XD: 'XD20', XE: 'XE40', XF: 'XF63', XG: 'XG19', XH: 'XH72', XI: 'XI31', XJ: 'XJ28' },
    { date: new Date('2024-08-07'), time: '11:45 AM', XA: 'XA21', XB: 'XB89', XC: 'XC64', XD: 'XD38', XE: 'XE56', XF: 'XF41', XG: 'XG27', XH: 'XH60', XI: 'XI12', XJ: 'XJ53' },
    { date: new Date('2024-08-07'), time: '12:00 PM', XA: 'XA30', XB: 'XB73', XC: 'XC59', XD: 'XD29', XE: 'XE18', XF: 'XF46', XG: 'XG25', XH: 'XH52', XI: 'XI34', XJ: 'XJ16' },
    { date: new Date('2024-08-07'), time: '12:15 PM', XA: 'XA67', XB: 'XB40', XC: 'XC74', XD: 'XD21', XE: 'XE53', XF: 'XF12', XG: 'XG47', XH: 'XH69', XI: 'XI22', XJ: 'XJ30' },
    { date: new Date('2024-08-07'), time: '12:30 PM', XA: 'XA51', XB: 'XB83', XC: 'XC27', XD: 'XD62', XE: 'XE33', XF: 'XF19', XG: 'XG55', XH: 'XH24', XI: 'XI12', XJ: 'XJ47' },
    { date: new Date('2024-08-07'), time: '12:45 PM', XA: 'XA44', XB: 'XB68', XC: 'XC39', XD: 'XD25', XE: 'XE74', XF: 'XF30', XG: 'XG20', XH: 'XH77', XI: 'XI29', XJ: 'XJ14' },
    { date: new Date('2024-08-07'), time: '01:00 PM', XA: 'XA28', XB: 'XB53', XC: 'XC61', XD: 'XD37', XE: 'XE21', XF: 'XF40', XG: 'XG13', XH: 'XH69', XI: 'XI34', XJ: 'XJ26' },
    { date: new Date('2024-08-07'), time: '01:15 PM', XA: 'XA56', XB: 'XB77', XC: 'XC42', XD: 'XD53', XE: 'XE18', XF: 'XF22', XG: 'XG49', XH: 'XH62', XI: 'XI21', XJ: 'XJ34' },
    { date: new Date('2024-08-07'), time: '01:30 PM', XA: 'XA63', XB: 'XB29', XC: 'XC53', XD: 'XD21', XE: 'XE41', XF: 'XF15', XG: 'XG30', XH: 'XH70', XI: 'XI16', XJ: 'XJ25' },
    { date: new Date('2024-08-07'), time: '01:45 PM', XA: 'XA54', XB: 'XB65', XC: 'XC31', XD: 'XD48', XE: 'XE36', XF: 'XF19', XG: 'XG42', XH: 'XH75', XI: 'XI27', XJ: 'XJ18' },
    { date: new Date('2024-08-07'), time: '02:00 PM', XA: 'XA31', XB: 'XB78', XC: 'XC22', XD: 'XD60', XE: 'XE29', XF: 'XF43', XG: 'XG14', XH: 'XH67', XI: 'XI19', XJ: 'XJ31' },
    { date: new Date('2024-08-07'), time: '02:15 PM', XA: 'XA42', XB: 'XB56', XC: 'XC71', XD: 'XD33', XE: 'XE22', XF: 'XF28', XG: 'XG45', XH: 'XH80', XI: 'XI24', XJ: 'XJ50' },
    { date: new Date('2024-08-07'), time: '02:30 PM', XA: 'XA27', XB: 'XB64', XC: 'XC46', XD: 'XD19', XE: 'XE37', XF: 'XF54', XG: 'XG21', XH: 'XH78', XI: 'XI12', XJ: 'XJ62' },
    { date: new Date('2024-08-07'), time: '02:45 PM', XA: 'XA55', XB: 'XB71', XC: 'XC32', XD: 'XD46', XE: 'XE20', XF: 'XF12', XG: 'XG63', XH: 'XH54', XI: 'XI29', XJ: 'XJ37' },
    { date: new Date('2024-08-07'), time: '03:00 PM', XA: 'XA34', XB: 'XB89', XC: 'XC41', XD: 'XD51', XE: 'XE27', XF: 'XF22', XG: 'XG49', XH: 'XH30', XI: 'XI23', XJ: 'XJ58' },
    { date: new Date('2024-08-07'), time: '03:15 PM', XA: 'XA61', XB: 'XB45', XC: 'XC52', XD: 'XD33', XE: 'XE19', XF: 'XF14', XG: 'XG30', XH: 'XH68', XI: 'XI20', XJ: 'XJ42' },
    { date: new Date('2024-08-07'), time: '03:30 PM', XA: 'XA50', XB: 'XB64', XC: 'XC30', XD: 'XD40', XE: 'XE23', XF: 'XF35', XG: 'XG12', XH: 'XH45', XI: 'XI25', XJ: 'XJ60' },
    { date: new Date('2024-08-07'), time: '03:45 PM', XA: 'XA47', XB: 'XB72', XC: 'XC53', XD: 'XD19', XE: 'XE31', XF: 'XF28', XG: 'XG14', XH: 'XH55', XI: 'XI22', XJ: 'XJ38' },
    { date: new Date('2024-08-07'), time: '04:00 PM', XA: 'XA62', XB: 'XB48', XC: 'XC41', XD: 'XD22', XE: 'XE16', XF: 'XF20', XG: 'XG35', XH: 'XH70', XI: 'XI32', XJ: 'XJ45' },
    { date: new Date('2024-08-07'), time: '04:15 PM', XA: 'XA40', XB: 'XB55', XC: 'XC64', XD: 'XD29', XE: 'XE42', XF: 'XF18', XG: 'XG27', XH: 'XH33', XI: 'XI24', XJ: 'XJ19' },
    { date: new Date('2024-08-07'), time: '04:30 PM', XA: 'XA53', XB: 'XB72', XC: 'XC39', XD: 'XD34', XE: 'XE50', XF: 'XF21', XG: 'XG30', XH: 'XH66', XI: 'XI28', XJ: 'XJ45' },
    { date: new Date('2024-08-07'), time: '04:45 PM', XA: 'XA27', XB: 'XB60', XC: 'XC22', XD: 'XD37', XE: 'XE56', XF: 'XF12', XG: 'XG33', XH: 'XH79', XI: 'XI35', XJ: 'XJ48' },
    { date: new Date('2024-08-07'), time: '05:00 PM', XA: 'XA49', XB: 'XB78', XC: 'XC41', XD: 'XD29', XE: 'XE32', XF: 'XF19', XG: 'XG28', XH: 'XH71', XI: 'XI24', XJ: 'XJ55' },
    { date: new Date('2024-08-07'), time: '05:15 PM', XA: 'XA35', XB: 'XB87', XC: 'XC53', XD: 'XD46', XE: 'XE27', XF: 'XF12', XG: 'XG30', XH: 'XH66', XI: 'XI28', XJ: 'XJ37' },
    { date: new Date('2024-08-07'), time: '05:30 PM', XA: 'XA61', XB: 'XB43', XC: 'XC32', XD: 'XD59', XE: 'XE21', XF: 'XF20', XG: 'XG36', XH: 'XH50', XI: 'XI26', XJ: 'XJ40' },
    { date: new Date('2024-08-07'), time: '05:45 PM', XA: 'XA57', XB: 'XB62', XC: 'XC29', XD: 'XD40', XE: 'XE38', XF: 'XF14', XG: 'XG33', XH: 'XH68', XI: 'XI21', XJ: 'XJ42' },
    { date: new Date('2024-08-07'), time: '06:00 PM', XA: 'XA52', XB: 'XB69', XC: 'XC31', XD: 'XD28', XE: 'XE47', XF: 'XF12', XG: 'XG29', XH: 'XH70', XI: 'XI34', XJ: 'XJ54' },
  ];
  
  
  

Item.insertMany(dummyData)
  .then(() => {
    console.log('Dummy data inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting dummy data:', error);
  });
