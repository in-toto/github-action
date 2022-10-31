# in-toto-run action

This is a wrapper for the in-toto-run command. It is intended to be used by
developers to wrap the commands that are performed as part of their software
supply chain. The wrapper will record metadata for the passed command.

## Example Usage

```yaml

on: [push]
permissions:
  id-token: write # This is required for requesting the JWT
  contents: read  # This is required for actions/checkout
jobs:
  test:
    runs-on: ubuntu-latest
    name: test intoto-run
    steps:
      - uses: actions/checkout@v2
      - uses: testifysec/intoto-run-action@main
        name: intoto run command
        with:
          step-name: 'test'
          private-key: | 
            -----BEGIN PRIVATE KEY-----
            MC4CAQAwBQYDK2VwBCIEIOl8ZskJnvzzBzudkifLO9EPu8Nuy9+eo8ryIZ7cVbwF
            -----END PRIVATE KEY-----
          command: touch test.txt
          products: 'test.txt'
          exclude: "node_modules/"
      - name: show-attestation
        run: cat $RUNNER_TEMP/meta/*.link
```

## Roadmap

- [ ] Add support for multiple commands
- [ ] Intgration with Fulcio for signing attestations
- [ ] Upload link meta-data to Archivist

## Contributing

Contributions are welcome! Please see our [contributing guidelines](GOVERNANCE.md).
```