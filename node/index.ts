import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api'
import { Clients } from './clients'
import { updateWorkingTime } from './handlers/updateWorkingTime'
import { updateDateLead } from './handlers/updateDateLead'
import { updateDateLeadPublic } from './handlers/updateDateLeadPublic'


// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

declare global {
  type Context = ServiceContext<Clients, RecorderState>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  routes: {
    updateWorkingTime: method({
      POST: [updateWorkingTime],
    }),
    updateDateLead: method({
      POST: [updateDateLead],
    }),
    updateDateLeadPublic: method({
      POST: [updateDateLeadPublic],
    }),
  },
})
