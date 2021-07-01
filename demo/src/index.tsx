import { logException } from "@codemirror/view"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror, ReactCodemirrorRefValues } from "../../dist"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const text = `from PIL import Image
import argparse
import sys
 
parser = argparse.ArgumentParser(description="Rotate an image")
 
parser.add_argument("image", nargs="?", help="Image", default=None)
parser.add_argument("angle", nargs="?", type=float, help="Angle", default=None)
 
arguments = parser.parse_args()
 
use_arguments_image = True if arguments.image is not None else False
use_arguments_angle = True if arguments.angle is not None else False
 
# Validation for image file name
while True:
    if use_arguments_image:
        image = arguments.image
    else:
        image = input("Enter the image file name: ")
 
    try:
        im = Image.open(image)
    except:
        print("Invalid image")
        if use_arguments_image:
            sys.exit()
        continue
    break
 
# Validation for angle
if use_arguments_angle:
    angle = arguments.angle
else:
    while True:
        angle = input("Enter the rotation angle in degrees: ")
 
        try:
            angle = float(angle)
        except:
            print("Invalid angle")
            continue
        break
 
im_rotate = im.rotate(angle, expand=True)
im_rotate.save("rotated_" + image)
`

const App: React.FC<Record<string | number, never>> = () => {
  const ref = React.useRef<ReactCodemirrorRefValues>()
  const [t, setT] = React.useState(text)

  return (
    <ReactCodemirror
      ref={ref}
      value={t}
      language="python"
      style={{ height: 500, fontSize: 14 }}
      scrollOptions={{
        topOffset: 80,
        bottomOffset: 80,
      }}
      langOptions={{
        schema: {},
      }}
      extensions={[]}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
