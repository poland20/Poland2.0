import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

export interface SpeakerCategory {
  name: string;
  displayName: string;
  edition: keystone.Schema.Relationship;
  moreToCome: boolean;
  sortOrder: number;
}

export type SpeakerCategoryDocument = keystone.Document<SpeakerCategory>;

const SpeakerCategory = new keystone.List<SpeakerCategory>('SpeakerCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true,
  sortContext: 'Edition:speaker-categories',
  defaultSort: '-sortOrder',
});

SpeakerCategory.add({
  name: { type: String, required: true },
  displayName: { type: String, required: true, initial: true },
  sortOrder: { type: Number, label: 'Sort order (higher is more important)' },
  edition: { type: Types.Relationship, ref: 'Edition', many: true },
  moreToCome: { type: Boolean, label: 'More speakers to come?' },
});

SpeakerCategory.relationship({ path: 'speakers', ref: 'Speaker', refPath: 'speakerCategory' });
SpeakerCategory.register();

export default SpeakerCategory;
