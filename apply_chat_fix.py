import os
import sys

path = r'D:\模拟人生4\ChatGPT\bb\lib\chat-storage.ts'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f'Total lines: {len(lines)}')

# Show relevant lines to verify structure
for i in [0,1,2,3,4,5,6,7,8,9,10,11,12]:
    print(f'{i+1:4}| {lines[i].rstrip()}')
print('---')
for i in range(28, 55):
    print(f'{i+1:4}| {lines[i].rstrip()}')