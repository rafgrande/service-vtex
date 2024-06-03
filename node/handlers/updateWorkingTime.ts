export async function updateWorkingTime(ctx: Context, next: () => Promise<any>) {
    
    const {
        clients: { changeValueField },
        vtex: {route}
      } = ctx
    
      const {params: {idClient}} = route;
    ctx.status = 200
    ctx.body = await changeValueField.updateWorkingTime(idClient)
    ctx.set('cache-control', 'no-cache')
  
    await next()
  }
  