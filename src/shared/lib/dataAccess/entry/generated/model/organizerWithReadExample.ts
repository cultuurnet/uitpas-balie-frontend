/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Entry API
 * With UiTdatabank's Entry API you can create new events, places and organizers, and add extra info to them with specific requests to add/update properties. For example there are operations to add a label, remove a label, add an image, and so on.
 * OpenAPI spec version: 3.0
 */
import type { OrganizerId } from './organizerId';
import type { OrganizerAddress } from './organizerAddress';
import type { OrganizerCompletedLanguages } from './organizerCompletedLanguages';
import type { CommonCompleteness } from './commonCompleteness';
import type { OrganizerContactPoint } from './organizerContactPoint';
import type { OrganizerContributors } from './organizerContributors';
import type { OrganizerCreated } from './organizerCreated';
import type { OrganizerCreator } from './organizerCreator';
import type { OrganizerDescription } from './organizerDescription';
import type { OrganizerEducationalDescription } from './organizerEducationalDescription';
import type { OrganizerGeo } from './organizerGeo';
import type { OrganizerHiddenLabels } from './organizerHiddenLabels';
import type { OrganizerImages } from './organizerImages';
import type { OrganizerLabels } from './organizerLabels';
import type { OrganizerLanguages } from './organizerLanguages';
import type { OrganizerMainImage } from './organizerMainImage';
import type { OrganizerMainLanguage } from './organizerMainLanguage';
import type { OrganizerModified } from './organizerModified';
import type { OrganizerName } from './organizerName';
import type { OrganizerUrl } from './organizerUrl';
import type { OrganizerWorkflowStatus } from './organizerWorkflowStatus';

/**
 * An organization that is hosting an event or is the owner of a location.

For more information: <a href="https://docs.publiq.be/docs/uitdatabank/entry-api/organizers/what-are-organizers">What are organizers?</a>
 */
export interface OrganizerWithReadExample {
  '@id'?: OrganizerId;
  address?: OrganizerAddress;
  completedLanguages?: OrganizerCompletedLanguages;
  completeness?: CommonCompleteness;
  contactPoint?: OrganizerContactPoint;
  contributors?: OrganizerContributors;
  created?: OrganizerCreated;
  creator?: OrganizerCreator;
  description?: OrganizerDescription;
  educationalDescription?: OrganizerEducationalDescription;
  geo?: OrganizerGeo;
  hiddenLabels?: OrganizerHiddenLabels;
  images?: OrganizerImages;
  labels?: OrganizerLabels;
  languages?: OrganizerLanguages;
  mainImage?: OrganizerMainImage;
  mainLanguage: OrganizerMainLanguage;
  modified?: OrganizerModified;
  name: OrganizerName;
  url: OrganizerUrl;
  workflowStatus?: OrganizerWorkflowStatus;
}
