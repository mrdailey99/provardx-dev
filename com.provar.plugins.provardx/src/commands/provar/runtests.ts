import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';
import ProvarDXUtility from '../../utilities/ProvarDXUtility';


/**
 * Runs the specified list of Provar test cases against the currently configured SFDX defaultuserrname unless overridden
 * in the command below or by a provardx-properties.json file
 * @author Himanshu Sharma
 * 
 */

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file.
const messages = Messages.loadMessages('@provartesting/provardx', 'runtests');
export default class runtests extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');
    public static examples = [
      `$ sfdx provar:runtests -f './myproperties.json'`
    ];
   
      
    protected static flagsConfig = {
      // flag with a value (-f, --filespec=VALUE)
      filespec: flags.string({char: 'f', description: messages.getMessage('fileSpecFlagDescription')}),
      // flag with a value (-p, --propertyfile=VALUE)
      propertyfile: flags.string({char: 'p', description: messages.getMessage('propertyFileFlagDescription')}),
      // flag with a value (-o, --connectionoverridefile=VALUE)
      connectionoverridefile: flags.string({char: 'o', description: messages.getMessage('connectionOverridefile')}),
      // flag with a value (-c, --cachepath=VALUE)
      cachepath: flags.string({char: 'c', description: messages.getMessage('cachePathFlagDescription')}),
      // flag with a value (-m, --metadatalevel=VALUE)
      metadatalevel: flags.string({char: 'm', description: messages.getMessage('metadataLevelFlagDescription')}),
      // flag with a value (-s, --secrets=VALUE)
      secrets: flags.string({char: 's', description: messages.getMessage('secretsFlagDescription')}),
      // flag with a value (-l, --loglevel VALUE)
      loglevel: flags.string({char: 'l', description: messages.getMessage('loglevelFlagDescription')})
    };
  
    public static args = [{name: 'file'}];

    public async run(): Promise<AnyJson> {
      const fileSpec : string = this.flags.filespec;
      const propertyFile : string = this.flags.propertyfile;
      const connectionOverrideFile : string = this.flags.connectionoverridefile;
      const cachePath : string = this.flags.cachepath;
      const metadataLevel : string = this.flags.metadatalevel;
      const secrets : string = this.flags.secrets;
      const logLevel : string = this.flags.loglevel;
      const json : string = this.flags.json;

      let provarDxUtils : ProvarDXUtility = new ProvarDXUtility();
      let isValid : boolean = provarDxUtils.validatePropertiesJson(propertyFile);

      if(!isValid) {
          this.ux.error("Invalid property file. Run command sfdx provar:validate -e true' to get the validation errors");
          return {};
      }
      this.ux.log('Provided parameters are: ');
      this.ux.log(fileSpec);
      this.ux.log(propertyFile);
      this.ux.log(connectionOverrideFile);
      this.ux.log(cachePath);
      this.ux.log(metadataLevel);
      this.ux.log(secrets);
      this.ux.log(logLevel);
      this.ux.log(json);
        
        //var properties = provarDxUtils.getProperties();
        
        //TODO: Actual logic to runtests.
        return {};
    }
}
