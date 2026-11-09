// External dependencies
const express = require('express')

const router = express.Router()

router.post('/what-is-your-home-address.html', function (req, res) {
  res.redirect('/phone-number.html')
})

router.post('/another-ethnic-group.html', function (req, res) {
  res.redirect('/another-ethnic-background.html')
})

router.post('/another-ethnic-background.html', function (req, res) {
  res.redirect('/illness-disability.html')
})

router.post('/phone-number.html', function (req, res) {
  res.redirect('/sex-and-gender.html')
})

router.post('/sex-and-gender.html', function (req, res) {
  res.redirect('/ethnic-group.html')
})

router.post('/areas-of-research.html', function (req, res) {
  res.redirect('/public-health-involvement.html')
})

router.post('/public-health-involvement.html', function (req, res) {
  res.redirect('/check-answers.html')
})

router.post('/public-health-involvement.html', function (req, res) {
  res.redirect('/check-answers.html')
})

router.post('/studies-email-address.html', function (req, res) {
  res.redirect('/studies-email-verification.html')
})


router.post('/opportunities-study-title-description.html', function (req, res) {
  req.session.data.studyTitle = req.body.studyTitle
  req.session.data.Description = req.body.Description
  return res.redirect('/opportunities-point-of-contact.html')
})

router.post('/opportunities-point-of-contact.html', function (req, res) {
  req.session.data.fullName = req.body.fullName
  req.session.data.Email = req.body.Email
  req.session.data.Telephone = req.body.Telephone
  req.session.data.Organisation = req.body.Organisation
  return res.redirect('/opportunities-recruitment-goal.html')
})

router.post('/opportunities-recruitment-goal.html', function (req, res) {
  req.session.data.recruitmentGoal = req.body.recruitmentGoal
  return res.redirect('/opportunities-recruitment-end.html')
})

router.post('/opportunities-recruitment-end.html', function (req, res) {
  const day = req.body['end-date-day'] || req.body.enddateDay || req.body.enddate
  const month = req.body['end-date-month'] || req.body.enddateMonth
  const year = req.body['end-date-year'] || req.body.enddateYear
  const endDate = [year, month, day].filter(Boolean).join('-')

  req.session.data['end-date'] = endDate
  req.session.data.enddate = endDate
  return res.redirect('/opportunities-stageone-complete.html')
})

router.post('/opportunities-about-the-opportunity.html', function (req, res) {
  req.session.data['about-the-opportunity'] = req.body['about-the-opportunity']
  res.redirect('/opportunities-opportunity-type.html')
})


router.post('/opportunities-opportunity-type.html', function (req, res, next) {
  const opportunityType = req.session.data.opportunityType

  if (opportunityType === 'Online or remote') {
    return res.redirect('/opportunities-inclusion-criteria.html')
  }

  if (opportunityType === 'In-person or on site') {
    return res.redirect('/opportunities-research-location.html')
  }

  if (opportunityType === 'Both online and in person') {
    return res.redirect('/opportunities-research-location.html')
  }

  next()
})



router.post('/opportunities-address-check-answer.html', function (req, res) {
  return res.redirect('/opportunities-inclusion-criteria.html')
})

router.post('/opportunities-inclusion-check-answer.html', function (req, res) {
  return res.redirect('/opportunities-what-will-the-participant-do.html')
})

router.post('/opportunities-what-will-the-participant-do.html', function (req, res) {
  req.session.data['what-will-the-participant-do'] = req.body['what-will-the-participant-do']
  return res.redirect('/opportunities-travel-inconvenience-costs.html')
})

router.post('/opportunities-inclusion-criteria.html', function (req, res) {
  const rawCriteria = req.body.inclusionCriteria || {}
  const criteria = Object.keys(rawCriteria)
    .map(function (key) {
      return rawCriteria[key]
    })
    .filter(function (criterion) {
      return criterion && criterion.inclusionCriterion
    })

  req.session.data.inclusionCriteria = criteria.length ? criteria : [{
    inclusionCriterion: req.body.inclusionCriterion || ''
  }]

  res.redirect('/opportunities-inclusion-check-answer.html')
})

router.post('/opportunities-travel-inconvenience-costs.html', function (req, res) {
  req.session.data.reimbursed = req.body.reimbursed
  return res.redirect('/opportunities-incentives.html')
})

router.post('/opportunities-incentives.html', function (req, res) {
  req.session.data.incentiveOffered = req.body.incentiveOffered
  req.session.data.incentiveDetails = req.body.incentiveDetails
  return res.redirect('/opportunities-additional-links.html')
})

router.post('/opportunities-additional-links.html', function (req, res) {
  req.session.data['additionalLinks'] = req.body['additionalLinks']
  return res.redirect('/opportunities-contact-details.html')
})



router.post('/opportunities-research-location.html', function (req, res) {
  const rawLocations = req.body.researchLocation || {}
  const locations = Object.keys(rawLocations)
    .map(function (key) {
      return rawLocations[key]
    })
    .filter(function (location) {
      return location && (
        location.addressLine1 ||
        location.addressLine2 ||
        location.addressLine3 ||
        location.townOrCity ||
        location.postcode
      )
    })

  req.session.data.researchLocation = locations.length ? locations : [{
    addressLine1: req.body.addressLine1 || '',
    addressLine2: req.body.addressLine2 || '',
    addressLine3: req.body.addressLine3 || '',
    townOrCity: req.body.townOrCity || '',
    postcode: req.body.postcode || ''
  }]

  req.session.data.addressLine1 = req.body.addressLine1
  req.session.data.addressLine2 = req.body.addressLine2
  req.session.data.addressLine3 = req.body.addressLine3
  req.session.data.townOrCity = req.body.townOrCity
  req.session.data.postcode = req.body.postcode

  res.redirect('/opportunities-address-check-answer.html')
})



router.post('/opportunities-contact-details.html', function (req, res) {
  const rawContacts = req.body.contactdetails || {}
  const contacts = Object.keys(rawContacts)
    .map(function (key) {
      return rawContacts[key]
    })
    .filter(function (contact) {
      return contact && (
        contact.name ||
        contact.role ||
        contact.organisation ||
        contact.telephone ||
        contact.email
      )
    })

  req.session.data.contactdetails = contacts.length ? contacts : [{
    name: req.body.name || '',
    role: req.body.role || '',
    organisation: req.body.organisation || '',
    telephone: req.body.telephone || '',
    email: req.body.email || ''
  }]

  req.session.data.name = req.body.name
  req.session.data.role = req.body.role
  req.session.data.organisation = req.body.organisation
  req.session.data.telephone = req.body.telephone
  req.session.data.email = req.body.email

  return res.redirect('/opportunities-contact-details-check-answers.html')
})

router.post('/opportunities-contact-details-check-answers.html', function (req, res) {
  res.redirect('/opportunities-information-to-register-by-email.html')
})

router.post('/opportunities-information-to-register-by-email.html', function (req, res) {
    req.session.data['email-information'] = req.body['email-information']
  res.redirect('/opportunities-check-answers.html')
})


router.post('/check-answers.html', function (req, res) {
  res.redirect('/registration-completed.html')
})

router.post('/illness-disability.html', function (req, res) {
  res.redirect('/illness-disability-conditions.html')
})

router.post('/illness-disability-conditions.html', function (req, res) {
  res.redirect('/areas-of-research.html')
})

router.post('/email-address.html', function (req, res) {
  res.redirect('/create-password.html')
})

router.post('/ethnic-group.html', function (req, res, next) {
  const ethnicGroup = req.session.data.ethnicGroup

  if (ethnicGroup === 'Asian or Asian British') {
    return res.redirect('/ethnic-group-asian-asian-british.html')
  }

  if (ethnicGroup === 'Black, African, Black British or Caribbean') {
    return res.redirect('/black-african-black-british-caribbean.html')
  }

  if (ethnicGroup === 'Mixed or multiple ethnic groups') {
    return res.redirect('/mixed-or-multiple-ethnic-group.html')
  }

   if (ethnicGroup === 'White') {
    return res.redirect('/white.html')
  }
    if (ethnicGroup === 'Another ethnic group') {
    return res.redirect('/another-ethnic-group.html')
  }
 

  next()
})

router.post('/black-african-black-british-caribbean.html', function (req, res) {
  const ethnicBackground = req.session.data.ethnicBackground

  if (ethnicBackground === 'Another Black, African, Black British or Caribbean background') {
    return res.redirect('/another-ethnic-background.html')
  }

  res.redirect('/illness-disability.html')
})

router.post('/ethnic-group-asian-asian-british.html', function (req, res) {
  const ethnicBackground = req.session.data.ethnicBackground

  if (ethnicBackground === 'Another Asian or Asian British background') {
    return res.redirect('/another-ethnic-background.html')
  }

  res.redirect('/illness-disability.html')
})

router.post('/mixed-or-multiple-ethnic-group.html', function (req, res) {
  const ethnicBackground = req.session.data.ethnicBackground

  if (ethnicBackground === 'Another mixed background') {
    return res.redirect('/another-ethnic-background.html')
  }

  res.redirect('/illness-disability.html')
})

router.post('/white.html', function (req, res) {
  const ethnicBackground = req.session.data.ethnicBackground

  if (ethnicBackground === 'Another White background') {
    return res.redirect('/another-ethnic-background.html')
  }

  res.redirect('/illness-disability.html')
})

router.post('/illness-disability.html', function (req, res) {
  const longtermIllness = req.session.data.longtermIllness

  if (longtermIllness === 'Yes') {
    return res.redirect('/illness-disability-conditions.html')
  }

  res.redirect('/areas-of-research.html')
})



router.post('/opportunities-inclusion-criteria.html', function (req, res) {
  const rawCriteria = req.body.inclusionCriteria || {}

  const criteria = Object.keys(rawCriteria)
    .map(function (key) {
      return rawCriteria[key]
    })
    .filter(function (item) {
      return item && item.inclusionCriterion
    })

  req.session.data.inclusionCriteria = criteria.length ? criteria : [{
    inclusionCriterion: ''
  }]

  res.redirect('/opportunities-inclusion-check-answer.html')
})
// Add your routes here - above the module.exports line

module.exports = router
