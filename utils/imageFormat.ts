export function imageExpoFormat(uri: string) {
  let filename = uri.split("/").pop();

  let match = filename ? /\.(\w+)$/.exec(filename) : null;
  let type = match ? `image/${match[1]}` : "image";

  return { uri, name: filename, type };
}
