export interface Fingerprint {
  products: Products;
}

export interface Products {
  identification: Identification;
  botd: Botd;
  rootApps: RootApps;
  emulator: Emulator;
  ipInfo: IpInfo;
  ipBlocklist: IpBlocklist;
  tor: Tor;
  vpn: Vpn;
  proxy: Proxy;
  incognito: Incognito;
  tampering: Tampering;
  clonedApp: ClonedApp;
  factoryReset: FactoryReset;
  jailbroken: Jailbroken;
  frida: Frida;
  privacySettings: PrivacySettings;
  virtualMachine: VirtualMachine;
  rawDeviceAttributes: RawDeviceAttributes;
  highActivity: HighActivity;
  locationSpoofing: LocationSpoofing;
  suspectScore: SuspectScore;
}

export interface Identification {
  data: Data;
}

export interface Data {
  visitorId: string;
  requestId: string;
  browserDetails: BrowserDetails;
  incognito: boolean;
  ip: string;
  ipLocation: IpLocation;
  timestamp: number;
  time: string;
  url: string;
  tag: Tag;
  confidence: Confidence;
  visitorFound: boolean;
  firstSeenAt: FirstSeenAt;
  lastSeenAt: LastSeenAt;
}

export interface BrowserDetails {
  browserName: string;
  browserMajorVersion: string;
  browserFullVersion: string;
  os: string;
  osVersion: string;
  device: string;
  userAgent: string;
}

export interface IpLocation {
  accuracyRadius: number;
  latitude: number;
  longitude: number;
  postalCode: string;
  timezone: string;
  city: City;
  country: Country;
  continent: Continent;
  subdivisions: Subdivision[];
}

export interface City {
  name: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface Continent {
  code: string;
  name: string;
}

export interface Subdivision {
  isoCode: string;
  name: string;
}

export interface Tag {}

export interface Confidence {
  score: number;
}

export interface FirstSeenAt {
  global: string;
  subscription: string;
}

export interface LastSeenAt {
  global: string;
  subscription: string;
}

export interface Botd {
  data: Data2;
}

export interface Data2 {
  bot: Bot;
  url: string;
  ip: string;
  time: string;
  userAgent: string;
  requestId: string;
}

export interface Bot {
  result: string;
}

export interface RootApps {
  data: Data3;
}

export interface Data3 {
  result: boolean;
}

export interface Emulator {
  data: Data4;
}

export interface Data4 {
  result: boolean;
}

export interface IpInfo {
  data: Data5;
}

export interface Data5 {
  v4: V4;
}

export interface V4 {
  address: string;
  geolocation: Geolocation;
  asn: Asn;
  datacenter: Datacenter;
}

export interface Geolocation {
  accuracyRadius: number;
  latitude: number;
  longitude: number;
  postalCode: string;
  timezone: string;
  city: City2;
  country: Country2;
  continent: Continent2;
  subdivisions: Subdivision2[];
}

export interface City2 {
  name: string;
}

export interface Country2 {
  code: string;
  name: string;
}

export interface Continent2 {
  code: string;
  name: string;
}

export interface Subdivision2 {
  isoCode: string;
  name: string;
}

export interface Asn {
  asn: string;
  name: string;
  network: string;
}

export interface Datacenter {
  result: boolean;
  name: string;
}

export interface IpBlocklist {
  data: Data6;
}

export interface Data6 {
  result: boolean;
  details: Details;
}

export interface Details {
  emailSpam: boolean;
  attackSource: boolean;
}

export interface Tor {
  data: Data7;
}

export interface Data7 {
  result: boolean;
}

export interface Vpn {
  data: Data8;
}

export interface Data8 {
  result: boolean;
  originTimezone: string;
  originCountry: string;
  methods: Methods;
}

export interface Methods {
  timezoneMismatch: boolean;
  publicVPN: boolean;
  auxiliaryMobile: boolean;
}

export interface Proxy {
  data: Data9;
}

export interface Data9 {
  result: boolean;
}

export interface Incognito {
  data: Data10;
}

export interface Data10 {
  result: boolean;
}

export interface Tampering {
  data: Data11;
}

export interface Data11 {
  result: boolean;
  anomalyScore: number;
}

export interface ClonedApp {
  data: Data12;
}

export interface Data12 {
  result: boolean;
}

export interface FactoryReset {
  data: Data13;
}

export interface Data13 {
  time: string;
  timestamp: number;
}

export interface Jailbroken {
  data: Data14;
}

export interface Data14 {
  result: boolean;
}

export interface Frida {
  data: Data15;
}

export interface Data15 {
  result: boolean;
}

export interface PrivacySettings {
  data: Data16;
}

export interface Data16 {
  result: boolean;
}

export interface VirtualMachine {
  data: Data17;
}

export interface Data17 {
  result: boolean;
}

export interface RawDeviceAttributes {
  data: Data18;
}

export interface Data18 {
  applePay: ApplePay;
  architecture: Architecture;
  audio: Audio;
  canvas: Canvas;
  colorDepth: ColorDepth;
  colorGamut: ColorGamut;
  contrast: Contrast;
  cookiesEnabled: CookiesEnabled;
  cpuClass: CpuClass;
  deviceMemory: DeviceMemory;
  domBlockers: DomBlockers;
  emoji: Emoji;
  fontPreferences: FontPreferences;
  fonts: Fonts;
  forcedColors: ForcedColors;
  hardwareConcurrency: HardwareConcurrency;
  hdr: Hdr;
  indexedDB: IndexedDb;
  invertedColors: InvertedColors;
  languages: Languages;
  localStorage: LocalStorage;
  math: Math;
  mathML: MathMl;
  monochrome: Monochrome;
  openDatabase: OpenDatabase;
  osCpu: OsCpu;
  pdfViewerEnabled: PdfViewerEnabled;
  platform: Platform;
  plugins: Plugins;
  privateClickMeasurement: PrivateClickMeasurement;
  reducedMotion: ReducedMotion;
  screenFrame: ScreenFrame;
  screenResolution: ScreenResolution;
  sessionStorage: SessionStorage;
  timezone: Timezone;
  touchSupport: TouchSupport;
  vendor: Vendor;
  vendorFlavors: VendorFlavors;
  webGlBasics: WebGlBasics;
  webGlExtensions: WebGlExtensions;
}

export interface ApplePay {
  value: number;
}

export interface Architecture {
  value: number;
}

export interface Audio {
  value: number;
}

export interface Canvas {
  value: Value;
}

export interface Value {
  Geometry: string;
  Text: string;
  Winding: boolean;
}

export interface ColorDepth {
  value: number;
}

export interface ColorGamut {
  value: string;
}

export interface Contrast {
  value: number;
}

export interface CookiesEnabled {
  value: boolean;
}

export interface CpuClass {}

export interface DeviceMemory {
  value: number;
}

export interface DomBlockers {}

export interface Emoji {
  value: Value2;
}

export interface Value2 {
  bottom: number;
  font: string;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface FontPreferences {
  value: Value3;
}

export interface Value3 {
  apple: number;
  default: number;
  min: number;
  mono: number;
  sans: number;
  serif: number;
  system: number;
}

export interface Fonts {
  value: string[];
}

export interface ForcedColors {
  value: boolean;
}

export interface HardwareConcurrency {
  value: number;
}

export interface Hdr {
  value: boolean;
}

export interface IndexedDb {
  value: boolean;
}

export interface InvertedColors {}

export interface Languages {
  value: string[][];
}

export interface LocalStorage {
  value: boolean;
}

export interface Math {
  value: string;
}

export interface MathMl {
  value: Value4;
}

export interface Value4 {
  bottom: number;
  font: string;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface Monochrome {
  value: number;
}

export interface OpenDatabase {
  value: boolean;
}

export interface OsCpu {}

export interface PdfViewerEnabled {
  value: boolean;
}

export interface Platform {
  value: string;
}

export interface Plugins {
  value: Value5[];
}

export interface Value5 {
  description: string;
  mimeTypes: MimeType[];
  name: string;
}

export interface MimeType {
  suffixes: string;
  type: string;
}

export interface PrivateClickMeasurement {}

export interface ReducedMotion {
  value: boolean;
}

export interface ScreenFrame {
  value: number[];
}

export interface ScreenResolution {
  value: number[];
}

export interface SessionStorage {
  value: boolean;
}

export interface Timezone {
  value: string;
}

export interface TouchSupport {
  value: Value6;
}

export interface Value6 {
  maxTouchPoints: number;
  touchEvent: boolean;
  touchStart: boolean;
}

export interface Vendor {
  value: string;
}

export interface VendorFlavors {
  value: string[];
}

export interface WebGlBasics {
  value: Value7;
}

export interface Value7 {
  renderer: string;
  rendererUnmasked: string;
  shadingLanguageVersion: string;
  vendor: string;
  vendorUnmasked: string;
  version: string;
}

export interface WebGlExtensions {
  value: Value8;
}

export interface Value8 {
  contextAttributes: string;
  extensionParameters: string;
  extensions: string;
  parameters: string;
  shaderPrecisions: string;
}

export interface HighActivity {
  data: Data19;
}

export interface Data19 {
  result: boolean;
  dailyRequests: number;
}

export interface LocationSpoofing {
  data: Data20;
}

export interface Data20 {
  result: boolean;
}

export interface SuspectScore {
  data: Data21;
}

export interface Data21 {
  result: number;
}
