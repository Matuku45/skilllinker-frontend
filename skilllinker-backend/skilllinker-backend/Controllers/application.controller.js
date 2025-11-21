const ApplicationService = require('../Services/application.service');

const ApplicationController = {
createApplication: async (req, res, next) => {
try {
// Log the incoming request body
console.log("Incoming application data:", req.body);

```
const { jobId, userId, resumeId, coverLetter } = req.body;

// Validate required fields
if (!jobId || !userId || !resumeId) {
  console.warn("Validation failed: missing required fields", req.body);
  return res.status(400).json({
    message: "jobId, userId, and resumeId are required",
    receivedData: req.body,
  });
}

// Optional: Type checks
if (typeof jobId !== "number" || typeof userId !== "number" || typeof resumeId !== "number") {
  console.warn("Validation failed: incorrect types", req.body);
  return res.status(400).json({
    message: "jobId, userId, and resumeId must be numbers",
    receivedData: req.body,
  });
}

const applicationData = {
  jobId,
  userId,
  resumeId,
  coverLetter: coverLetter || "No cover letter provided",
};

console.log("Sending to ApplicationService:", applicationData);

const app = await ApplicationService.createApplication(applicationData);

return res.status(201).json({ message: "Application created successfully", application: app });
```

} catch (err) {
console.error("CREATE APPLICATION ERROR:", err);
next(err); // Forward to global error handler
}
}
,

  getAllApplications: async (req, res, next) => {
    try {
      const apps = await ApplicationService.getAllApplications();
      res.status(200).json(apps);
    } catch (err) {
      console.error("GET APPLICATIONS ERROR:", err);
      next(err);
    }
  },

  getApplicationById: async (req, res, next) => {
    try {
      const app = await ApplicationService.getApplicationById(req.params.id);
      if (!app) return res.status(404).json({ message: 'Application not found' });
      res.status(200).json(app);
    } catch (err) {
      console.error("GET APPLICATION ERROR:", err);
      next(err);
    }
  },

  updateApplicationStatus: async (req, res, next) => {
    try {
      const updatedApp = await ApplicationService.updateApplicationStatus(req.params.id, req.body.status);
      res.status(200).json(updatedApp);
    } catch (err) {
      console.error("UPDATE APPLICATION ERROR:", err);
      next(err);
    }
  },

  deleteApplication: async (req, res, next) => {
    try {
      await ApplicationService.deleteApplication(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error("DELETE APPLICATION ERROR:", err);
      next(err);
    }
  },
};

module.exports = ApplicationController;
