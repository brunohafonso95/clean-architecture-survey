import moduleAlias from 'module-alias';
import path from 'path';

const files = path.resolve(__dirname, '..', '..');

moduleAlias.addAliases({
  '@data': path.join(files, 'data'),
  '@decorators': path.join(files, 'decorators'),
  '@domain': path.join(files, 'domain'),
  '@infra': path.join(files, 'infra'),
  '@main': path.join(files, 'main'),
  '@presentation': path.join(files, 'presentation'),
  '@utils': path.join(files, 'utils'),
});
