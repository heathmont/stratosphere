/**
 * Collection
 */
Versions = new Mongo.Collection("versions");

/**
 * Indexes
 */
if(Meteor.isServer){
    Versions._ensureIndex({ "packageName": 1 });
    Versions._ensureIndex({ "private": 1, "hidden": 1 });
    Versions._ensureIndex({ "private": 1 });
    Versions._ensureIndex({ "packageName": 1, "private": 1 });
    Versions._ensureIndex({ "packageName": 1, "version": 1 });
    Versions._ensureIndex({ "versionMagnitude": 1 });
    Versions._ensureIndex({ hidden:1, lastUpdated:1});
}

/**
 * Schemas
 */
Stratosphere.schemas.VersionSchema = new SimpleSchema([Stratosphere.schemas.BaseSchema,{
    'packageName':{
        type:String,
        custom:Stratosphere.utils.validatePackageName
    },
    'version':{
        type:String,
        custom:Stratosphere.utils.validateVersion
    },
    'description':{
        type:String,
        max:100
    },
    'longDescription':{
        type:String,
        optional:true,
        max:1500
    },
    'earliestCompatibleVersion':{
        type:String,
        defaultValue:'1.0.0'
    },
    'ecRecordFormat':{
        type:String,
        defaultValue:'1.0'
    },
    'git':{
        type:String,
        optional:true
    },
    'compilerVersion':{
        type:String
    },
    'containsPlugins':{
        type:Boolean,
        optional:true,
        defaultValue:false
    },
    'debugOnly':{
        type:Boolean,
        optional:true,
        defaultValue:false
    },
    'prodOnly':{
        type:Boolean,
        optional:true,
        defaultValue:false
    },
    'exports':{
        type:[Object],
        optional:true,
        defaultValue:[]
    },
    'exports.$.name':{
        type:String
    },
    'exports.$.architectures':{
        type:[String]
    },
    'releaseName':{
        type:String,
        optional:true
    },
    'dependencies':{
        type:[Object]
    },
    'dependencies.$.packageName':{
        type:String,
        optional:true
    },
    'dependencies.$.constraint':{
        type:String,
        optional:true
    },
    'dependencies.$.references':{
        type:[Object]
    },
    'dependencies.$.references.$.arch':{
        type:String,
        allowedValues:Stratosphere.schemas.archTypes
    },
    'dependencies.$.references.$.implied':{
        type:Boolean,
        optional:true
    },
    'dependencies.$.references.$.weak':{
        type:Boolean,
        optional:true
    },
    'dependencies.$.references.$.unordered':{
        type:Boolean,
        optional:true
    },
    'unmigrated':{
        type:Boolean,
        optional:true
    },
    'source':{
        type:Stratosphere.schemas.VersionSourceSchema,
        optional:true
    },
    'readme':{
        type:Stratosphere.schemas.ReadmeSchema,
        optional:true
    },
    'publishedBy':{
        type:Stratosphere.schemas.UserSchema,
        optional:true
    },
    'published':{
        type:Date,
        optional:true
    }
}]);
Stratosphere.schemas.CustomVersionSchema = new SimpleSchema([Stratosphere.schemas.VersionSchema,Stratosphere.schemas.CustomFieldsSchema.pick(['private','hidden','versionMagnitude'])]);
Stratosphere.schemas.VersionIdentifierSchema = Stratosphere.schemas.VersionSchema.pick(['packageName','version']);