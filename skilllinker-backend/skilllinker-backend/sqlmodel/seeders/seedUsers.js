// seedTables.js
require('dotenv').config({ path: __dirname + '/../../.env' }); // ensure correct .env path

const sequelize = require('../../config/database'); // Sequelize instance
const Resume = require('../models/Resume');
const Application = require('../models/Application');

async function seedTables() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Sync models (create or alter tables)
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
  } catch (err) {
    console.error('❌ Error seeding tables:', err);
  } finally {
    await sequelize.close();
  }
}

seedTables();
