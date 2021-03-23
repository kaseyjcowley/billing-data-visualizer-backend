import re
import random
import sys
import json
import os
import shapefile
from shapely.geometry import shape, Point

# function that takes a shapefile location and a country name as inputs
def random_points_in_country(shapes, country_name, total):
    country = [s for s in shapes.records() if country_name in s][0] # getting feature(s) that match the country name 
    country_id = int(re.findall(r'\d+', str(country))[0]) # getting feature(s)'s id of that match

    shapeRecs = shapes.shapeRecords()
    feature = shapeRecs[country_id].shape.__geo_interface__

    shp_geom = shape(feature)

    minx, miny, maxx, maxy = shp_geom.bounds
    coordinates = []

    for x in range(total):
      while True:
        p = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
        if shp_geom.contains(p):
            coordinates.append((p.y, p.x))
            break
    
    return coordinates

def main():
  country,total = sys.argv[1:3]
  shapes = shapefile.Reader(os.path.join(os.path.dirname(__file__), "World_Countries.shp")) # reading shapefile with pyshp library
  coordinates = random_points_in_country(shapes, country, int(total))
  print(json.dumps(coordinates))

if __name__ == "__main__":
  main()