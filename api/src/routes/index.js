const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerCountries = require('./countries.js')
const routerActivities = require('./activities.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();
router.use('/countries', routerCountries);
router.use('/activities', routerActivities);

module.exports = router;
