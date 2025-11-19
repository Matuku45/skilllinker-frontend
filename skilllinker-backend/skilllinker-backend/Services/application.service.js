// Services/application.service.js
const Application = require('../sqlmodel/models/Application');

class ApplicationService {
  static async createApplication(data) {
    return await Application.create(data);
  }

  static async getAllApplications() {
    return await Application.findAll({
      include: ['Job', 'User']
    });
  }

  static async getApplicationById(id) {
    return await Application.findByPk(id, {
      include: ['Job', 'User']
    });
  }

  static async updateApplicationStatus(id, status) {
    const application = await Application.findByPk(id);
    if (!application) throw new Error('Application not found');
    application.status = status;
    return await application.save();
  }

  static async deleteApplication(id) {
    const application = await Application.findByPk(id);
    if (!application) throw new Error('Application not found');
    return await application.destroy();
  }
}

module.exports = ApplicationService;
