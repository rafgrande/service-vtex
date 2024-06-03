import { AppClient, InstanceOptions, IOContext } from '@vtex/api'


export default class ChangeValueField extends AppClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super('https://compracerta.vtexcommercestable.com.br', context, {
            ...options,
            headers: {
              "X-Vtex-Use-Https": "true",
            },
          })
      }

      appKey = "";
  appToken = "";

    public async updateWorkingTime(idClient: string | string[]): Promise<any> {
      console.log('------ 1 ')
        const cl = await this.http.get(`https://compracerta.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=id,email,xRegistroEmpregado&id=${idClient}`,
            {
              headers: {
                "Content-Type": "application/json",
                "x-vtex-api-appKey": this.appKey,
                "x-vtex-api-appToken": this.appToken,
              }
            }
          );
          
          const {xRegistroEmpregado} = cl[0];

          if(xRegistroEmpregado){
            const re = await this.http.get(`https://compracerta.vtexcommercestable.com.br/api/dataentities/RE/search?_fields=id,welcomeDate,exitDate&id=${xRegistroEmpregado}`,
            {
              headers: {
                "Content-Type": "application/json",
                "x-vtex-api-appKey": this.appKey,
                "x-vtex-api-appToken": this.appToken,
              }
            }
          );

          console.log(re)

          const {welcomeDate, exitDate} = re[0]
          const d1 = new Date(welcomeDate).getTime();
            const d2 = Date.now();
            const d3 = (d2 - d1) / (1000 * 60 * 60 * 24);
            const d4 = d3 / 365;

            if(!exitDate){
              console.log(d4.toFixed(0))

              return {worktime: d4.toFixed(0)}
            } else {
              return {worktime: 0};
            }

          } else {
            return {worktime: 0};
          }

      }

      //updateDateLead
       /* const cl = await this.http.get(`https://compracerta.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=id,email&id=${idClient}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-vtex-api-appKey": this.appKey,
              "x-vtex-api-appToken": this.appToken,
            }
          }
        );
        console.log('----------------2', cl)*/

      public async updateDateLead(idClient: string | string[]): Promise<any> {
      

        const cl = await this.http.patch(`https://compracerta.vtexcommercestable.com.br/api/dataentities/CL/documents/c3f1ef63-a558-11e7-9554-0aefcf5a4268`,
        {
          "profileImage": "t"
        },
          {
            headers: {
              "Content-Type": "application/json",
              "x-vtex-api-appKey": this.appKey,
              "x-vtex-api-appToken": this.appToken,
            }
          }
        );
        console.log(cl)
        
        return {date: new Date()}


      }
}
