import {DefaultUrlSerializer, UrlSerializer, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomUrlSerializer implements UrlSerializer {

  constructor(private defaultUrlSerializer: DefaultUrlSerializer) {
  }

  parse(url: string): UrlTree {
    // Custom code here
    // Change # signs to encoded spaces
    url = url.replace(/#/g, '%23');
    // Use the default serializer that you can import to just do the
    // default parsing now that you have fixed the url.
    return this.defaultUrlSerializer.parse(url)
  }

  serialize(tree: UrlTree): string {
    // Use the default serializer to create a url and replace any spaces with # signs
    return this.defaultUrlSerializer.serialize(tree).replace(/%23/g, '#');
  }
}


