// Controllers/application.controller.js
const ApplicationService = require('../Services/application.service');

class ApplicationController {
  static async createApplication(req, res, next) {
    try {
      const app = await ApplicationService.createApplication(req.body);
      res.status(201).json(app);
    } catch (error) {
      next(error);
    }
  }

  static async getAllApplications(req, res, next) {
    try {
      const apps = await ApplicationService.getAllApplications();
      res.status(200).json(apps);
    } catch (error) {
      next(error);
    }
  }

  static async getApplicationById(req, res, next) {
    try {
      const app = await ApplicationService.getApplicationById(req.params.id);
      if (!app) return res.status(404).json({ message: 'Application not found' });
      res.status(200).json(app);
    } catch (error) {
      next(error);
    }
  }

  static async updateApplicationStatus(req, res, next) {
    try {
      const updatedApp = await ApplicationService.updateApplicationStatus(
        req.params.id,
        req.body.status
      );
      res.status(200).json(updatedApp);
    } catch (error) {
      next(error);
    }
  }

  static async deleteApplication(req, res, next) {
    try {
      await ApplicationService.deleteApplication(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ApplicationController;
