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

router.post('/check-answers.html', function (req, res) {
  res.redirect('/registration-completed.html')
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


// Add your routes here - above the module.exports line

module.exports = router
