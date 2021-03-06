const axios = require("axios");

newAdvice = [];

module.exports = {
  getFamily: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_families()
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },
  removeFamily: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;

    dbInstance
      .remove_family([id])
      .then(response => res.status(200).send(response))
      .catch(console.log);
    // .catch(() => res.status(500).send());
  },
  submitFamily: (req, res, next) => {
    console.log(req.user);
    const dbInstance = req.app.get("db");
    const { userid } = req.user;
    const { name, address1, address2, city, stateName, zip } = req.body;

    console.log(req.body);

    dbInstance
      .add_family([name, address1, address2, city, stateName, zip, userid])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },

  getPerson: (req, res, next) => {
    const { familyid } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .get_person([familyid])
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },

  removePerson: (req, res, next) => {
    const { id, familyId } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .remove_person([id, familyId])
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },

  submitPerson: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const {
      firstName,
      lastName,
      role,
      birthday,
      work,
      income,
      race,
      ethnicity,
      firstChild,
      education,
      record,
      familyId
    } = req.body;

    console.log(req.body);

    dbInstance
      .add_person([
        firstName,
        lastName,
        role,
        birthday,
        work,
        income,
        race,
        ethnicity,
        firstChild,
        education,
        record,
        familyId
      ])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(console.log);
  },

  editActive: (req, res, next) => {
    const { familyId, id } = req.params;
    const { val } = req.body;
    console.log(familyId);
    const dbInstance = req.app.get("db");
    dbInstance
      .edit_active([val, id, familyId])
      .then(response => res.status(200).send(response))
      .catch(e => console.log(e));
  },

  getNotes: (req, res, next) => {
    const { familyid } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .get_notes([familyid])
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },

  removeNotes: (req, res, next) => {
    const { id, familyid } = req.params;
    const dbInstance = req.app.get("db");
    console.log(req.params);
    dbInstance
      .remove_notes([id, familyid])
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },

  submitCaseNotes: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { familyId, date, notes } = req.body;

    dbInstance
      .add_notes([familyId, date, notes])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(console.log);
  },

  getGoal: (req, res, next) => {
    const { familyid } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .get_goals([familyid])
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },

  removeGoal: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .remove_goal()
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },

  submitGoal: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { goal, step1, step2, step3, familyid } = req.body;

    console.log(req.body);

    dbInstance
      .add_goal([goal, step1, step2, step3, familyid])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(console.log);
  },

  editSlider: (req, res, next) => {
    const { familyId, id } = req.params;
    const { slider } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .edit_slider([slider, id, familyId])
      .then(response => res.status(200).send(response))
      .catch(e => console.log(e));
  },

  getAdvice: (req, res, next) => {
    axios
      .get(`http://api.adviceslip.com/advice`)
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch();
  }
};
