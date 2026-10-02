import koa from 'koa'
import KoaJoiRouter from '@koa-better-modules/joi-router'

const app = new koa({ proxy: true })

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            message: 'Error interno, intente en otro momento'
        }
    }
})

const router = new KoaJoiRouter()
router.prefix('/v1')

router.post('/movies', async (ctx, next) => {

})
