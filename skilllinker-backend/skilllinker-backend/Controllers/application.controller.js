// Controllers/application.controller.js
const ApplicationService = require('../Services/application.service');

const ApplicationController = {
  createApplication: async (req, res, next) => {
    try {
      const app = await ApplicationService.createApplication(req.body);
      res.status(201).json(app);
    } catch (error) {
      next(error);
    }
  },

  getAllApplications: async (req, res, next) => {
    try {
      const apps = await ApplicationService.getAllApplications();
      res.status(200).json(apps);
    } catch (error) {
      next(error);
    }
  },

  getApplicationById: async (req, res, next) => {
    try {
      const app = await ApplicationService.getApplicationById(req.params.id);
      if (!app) return res.status(404).json({ message: 'Application not found' });
      res.status(200).json(app);
    } catch (error) {
      next(error);
    }
  },

  updateApplicationStatus: async (req, res, next) => {
    try {
      const updatedApp = await ApplicationService.updateApplicationStatus(
        req.params.id,
        req.body.status
      );
      res.status(200).json(updatedApp);
    } catch (error) {
      next(error);
    }
  },

  deleteApplication: async (req, res, next) => {
    try {
      await ApplicationService.deleteApplication(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ApplicationController;
