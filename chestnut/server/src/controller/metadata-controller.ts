import { Request, Response, Express } from 'express';
import { Model } from 'mongoose';
import { ModelDescription, PropertyDescription } from '../../../common/metadata';
import { Store } from '../store';

export function createMetadataController(app: Express, store: Store, baseUrl: string) {
    app.get(baseUrl + '/metadata', (req: Request, res: Response) => {
        const modelDescriptions = Object.keys(store.models).map(key => {
            const mongooseModel = store.models[key] as any; // mongooseModel
            const modelName = key.toLowerCase();

            const properties = Object.keys(mongooseModel.schema.paths)
                .filter(k => k !== '__v')
                .map(p => {
                    const property = mongooseModel.schema.paths[p];
                    const objProperty = mongooseModel.schema.obj[p];
                    const desc: PropertyDescription = {
                        name: p,
                        type: property.instance,
                        default: property.defaultValue,
                        required: property.isRequired,
                        enumValues: property.enumValues,
                        regExp: property.regExp,
                        reference: objProperty ? objProperty.ref : null,
                    };

                    return desc;
                });

            return { name: key, properties: properties } as ModelDescription;
        });

        const metadata = { models: modelDescriptions };

        res.send(metadata).end();
    });
}
