import { IOClients } from '@vtex/api'

import ChangeValueField from './changeValueField'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
    public get changeValueField() {
        return this.getOrSet('changeValueField',  ChangeValueField)
    }
}
