import { setConfig } from './config'
import ServerlessBBSPanel from './components/ServerlessBBSPanel'
import ServerlessBBSCounter from './components/ServerlessBBSCounter'
import ServerlessBBSPageView from './components/ServerlessBBSPageView'
import { NamedExoticComponent } from 'react';
import { BBSCounterProps, BBSPageViewProps, BBSPanelParams } from './types';

export const BBSPanel : NamedExoticComponent<BBSPanelParams>=ServerlessBBSPanel
export const BBSCounter : NamedExoticComponent<BBSCounterProps>=ServerlessBBSCounter
export const BBSPageView : NamedExoticComponent<BBSPageViewProps>=ServerlessBBSPageView

export { setConfig }
