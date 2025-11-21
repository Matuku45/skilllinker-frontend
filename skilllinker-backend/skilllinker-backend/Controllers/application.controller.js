// Only ApplicationService is required as resume integration is removed
const ApplicationService = require('../services/application.service');

const ApplicationController = {
  /**
   * Creates a new application entry (without requiring a resume).
   */
  createApplication: async (req, res, next) => {
    try {
      // resumeId is removed from destructuring
      const { jobId, userId, coverLetter } = req.body;

      // Input validation: only jobId and userId are required
      if (!jobId || !userId) {
        // 🚨 FRIENDLY, SIMPLE LOGGING FOR MISSING DATA 🚨
        console.error(`🔴 APPLICATION POST ERROR: Missing required data. Both 'jobId' and 'userId' must be included in the request body.`);
        // --------------------------------------------------
        
        // This is the response sent back to the client (400 Bad Request)
        return res.status(400).json({ message: "jobId and userId are required" });
      }

      // ... rest of the successful application creation logic ...
      const app = await ApplicationService.createApplication({ 
        jobId, 
        userId, 
        coverLetter: coverLetter || "No cover letter provided" 
      });

      res.status(201).json({ 
        message: "Application submitted successfully", 
        application: app 
      });
    } catch (err) {
      // LOGGING THE FULL ERROR OBJECT: This is for unexpected server errors (500)
      console.error("CREATE APPLICATION ERROR (Full Details):", err);
      next(err);
    }
  },

  // ... rest of the ApplicationController methods ...

  /**
   * Retrieves all applications.
   */
  getAllApplications: async (req, res, next) => {
    try {
      const apps = await ApplicationService.getAllApplications();
      res.status(200).json(apps);
    } catch (err) {
      // LOGGING THE FULL ERROR OBJECT: This includes the stack trace and specific error details.
      console.error("GET APPLICATIONS ERROR (Full Details):", err);
      next(err);
    }
  },

  /**
   * Retrieves an application by its ID.
   */
  getApplicationById: async (req, res, next) => {
    try {
      const app = await ApplicationService.getApplicationById(req.params.id);
      if (!app) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json(app);
    } catch (err) {
      // LOGGING THE FULL ERROR OBJECT: This includes the stack trace and specific error details.
      console.error("GET APPLICATION ERROR (Full Details):", err);
      next(err);
    }
  },

  /**
   * Updates the status of an existing application.
   */
  updateApplicationStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const updatedApp = await ApplicationService.updateApplicationStatus(req.params.id, status); 
      res.status(200).json({ 
        message: "Application status updated", 
        application: updatedApp 
      });
    } catch (err) {
      // LOGGING THE FULL ERROR OBJECT: This includes the stack trace and specific error details.
      console.error("UPDATE APPLICATION ERROR (Full Details):", err);
      next(err);
    }
  },

  /**
   * Deletes an application by its ID.
   */
  deleteApplication: async (req, res, next) => {
    try {
      await ApplicationService.deleteApplication(req.params.id);
      res.status(204).send();
    } catch (err) {
      // LOGGING THE FULL ERROR OBJECT: This includes the stack trace and specific error details.
      console.error("DELETE APPLICATION ERROR (Full Details):", err);
      next(err);
    }
  },

  // The handleApplicationUpload method has been removed entirely.
};

module.exports = ApplicationController;