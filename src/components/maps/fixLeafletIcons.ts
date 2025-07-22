import L from "leaflet";

interface ExtendedIconDefault extends L.Icon.Default {
  _getIconUrl?: string;
}

delete (L.Icon.Default.prototype as ExtendedIconDefault)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});
