import { CONTROLLERS } from './controllers';
import { EntryController } from './entry-controller/entry-controller';

describe('CONTROLLERS Array', () => {
  it('should contain an instance of EntryController', () => {
    const entryControllerInstance = CONTROLLERS.find(controller => controller instanceof EntryController);
    
    expect(entryControllerInstance).toBeDefined();
    expect(entryControllerInstance).toBeInstanceOf(EntryController);

  });

});
