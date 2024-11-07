export const OVERPASS_PARKS_QUERY = `
        [out:json];
        area["wikidata"="Q90"]->.searchArea;
        (
          way["leisure"~"park|garden|pitch|playground"](area.searchArea);
          relation["leisure"~"park|garden|pitch|playground"](area.searchArea);
          way["landuse"="forest"](area.searchArea);
          relation["landuse"="forest"](area.searchArea);
          way["natural"="wood"](area.searchArea);
          relation["natural"="wood"](area.searchArea);
        );
        out geom;
    `;