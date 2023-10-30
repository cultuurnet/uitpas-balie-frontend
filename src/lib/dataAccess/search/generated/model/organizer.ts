/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { OrganizerId } from './organizerId';
import type { OrganizerAddress } from './organizerAddress';
import type { OrganizerCompletedLanguages } from './organizerCompletedLanguages';
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
export interface Organizer {
  '@id'?: OrganizerId;
  address?: OrganizerAddress;
  completedLanguages?: OrganizerCompletedLanguages;
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