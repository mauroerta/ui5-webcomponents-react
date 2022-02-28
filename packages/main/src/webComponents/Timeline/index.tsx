import '@ui5/webcomponents-fiori/dist/Timeline.js';
import { ReactNode } from 'react';
import { TimelineLayout } from '../../enums';
import { CommonProps } from '../../interfaces/CommonProps';
import { Ui5DomRef } from '../../interfaces/Ui5DomRef';
import { withWebComponent } from '../../internal/withWebComponent';

interface TimelineAttributes {
  /**
   * Defines the accessible aria name of the component.
   */
  accessibleName?: string;
  /**
   * Defines the items orientation.
   *
   * **Note:** Available options are:
   *
   * *   `Vertical`
   * *   `Horizontal`
   */
  layout?: TimelineLayout | keyof typeof TimelineLayout;
}

export interface TimelineDomRef extends TimelineAttributes, Ui5DomRef {}

export interface TimelinePropTypes extends TimelineAttributes, CommonProps {
  /**
   * Determines the content of the `Timeline`.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * The `Timeline` component shows entries (such as objects, events, or posts) in chronological order. A common use case is to provide information about changes to an object, or events related to an object. These entries can be generated by the system (for example, value XY changed from A to B), or added manually. There are two distinct variants of the timeline: basic and social. The basic timeline is read-only, while the social timeline offers a high level of interaction and collaboration, and is integrated within SAP Jam
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Timeline" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Timeline = withWebComponent<TimelinePropTypes, TimelineDomRef>(
  'ui5-timeline',
  ['accessibleName', 'layout'],
  [],
  [],
  []
);

Timeline.displayName = 'Timeline';

Timeline.defaultProps = {
  layout: TimelineLayout.Vertical
};

export { Timeline };
