#!/bin/bash

VERSION=$(replicator --version | cut -d ' ' -f 2)

replicator output schema global > public/schemas/latest/replicator.global-schema.json
replicator output schema template > public/schemas/latest/replicator.template-schema.json
replicator output schema workspace > public/schemas/latest/replicator.workspace-schema.json
replicator output schema replay > public/schemas/latest/replicator.replay-schema.json
mkdir "public/schemas/${VERSION}"
cp public/schemas/latest/replicator.global-schema.json "public/schemas/${VERSION}/replicator.global-schema.json"
cp public/schemas/latest/replicator.template-schema.json "public/schemas/${VERSION}/replicator.template-schema.json"
cp public/schemas/latest/replicator.workspace-schema.json "public/schemas/${VERSION}/replicator.workspace-schema.json"
cp public/schemas/latest/replicator.replay-schema.json "public/schemas/${VERSION}/replicator.replay-schema.json"
