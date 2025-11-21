require('dotenv').config(); // load .env

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with .env variables
const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
host: process.env.DB_HOST,
port: process.env.DB_PORT || 3306, // fallback to 3306 if not set
dialect: 'mysql',
logging: false,
}
);

// Define Resume model
const Resume = sequelize.define(
'Resume',
{
userId: { type: DataTypes.INTEGER, allowNull: false },
filename: { type: DataTypes.STRING, allowNull: false },
mimetype: { type: DataTypes.STRING, allowNull: false },
data: { type: DataTypes.BLOB('long'), allowNull: false },
description: { type: DataTypes.STRING },
},
{
tableName: 'resumes',
timestamps: true,
}
);

// Define Application model
const Application = sequelize.define(
'Application',
{
jobId: { type: DataTypes.INTEGER, allowNull: false },
userId: { type: DataTypes.INTEGER, allowNull: false },
resumeId: { type: DataTypes.INTEGER, allowNull: false },
coverLetter: { type: DataTypes.TEXT },
status: { type: DataTypes.ENUM('pending', 'accepted', 'rejected'), defaultValue: 'pending' },
},
{
tableName: 'applications',
timestamps: true,
}
);

// Optional association (not required for seeding)
// Resume.hasMany(Application, { foreignKey: 'resumeId' });
// Application.belongsTo(Resume, { foreignKey: 'resumeId' });

async function seedTables() {
try {
await sequelize.authenticate();
console.log('✅ Database connection successful');

```
// Sync models (creates or alters tables)
await sequelize.sync({ alter: true });
console.log('🗄 Tables synced');

// Seed a sample Resume
const [resume] = await Resume.findOrCreate({
  where: { filename: 'john_resume.pdf' },
  defaults: {
    userId: 1,
    filename: 'john_resume.pdf',
    mimetype: 'application/pdf',
    data: Buffer.from('Sample Resume Data'),
    description: 'Resume for John Doe',
  },
});
console.log('✅ Resume seeded:', resume.filename);

// Seed a sample Application
const [application] = await Application.findOrCreate({
  where: { userId: 1, jobId: 1, resumeId: resume.id },
  defaults: {
    jobId: 1,
    userId: 1,
    resumeId: resume.id,
    coverLetter: 'I am very interested in this job.',
    status: 'pending',
  },
});
console.log('✅ Application seeded for userId:', application.userId);

console.log('🎉 Seeding completed successfully');
```

} catch (err) {
console.error('❌ Error seeding tables:', err);
} finally {
await sequelize.close();
}
}

seedTables();
