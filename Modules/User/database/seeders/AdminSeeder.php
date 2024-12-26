<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\User\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
                // user
            'user/read',
            'user/create',
            'user/update',
            'user/delete',

                // server
            'server/read',
            'server/create',
            'server/update',
            'server/delete',

                // module
            'module/read',
            'module/create',
            'module/update',
            'module/delete',

                // on or off server
            'server/off',

                // log
            'log/user',
            'log/app',


        ];

            foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }


        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $adminRole->syncPermissions(Permission::all());

        $admin = User::firstOrCreate(
            ['auth_name' => 'ownerApp'],
            [
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'password' => Hash::make('password'),
            ],
        );

        $admin->assignRole($adminRole);


            // visitor
        $visitorRole = Role::firstOrCreate(['name' => 'visitor']);
        $permissions = Permission::whereIn('name', ['server/read', 'module/read'])->get();
        $visitorRole->syncPermissions($permissions);

            // expert
        $visitorRole = Role::firstOrCreate(['name' => 'expert']);
        $permissions = Permission::whereIn('name', ['server/read', 'server/create','serve/update',
                                        'server/delete', 'moduel/read', 'module/create', 'module/update',
                                        'module/delte', 'server/off', 'log/app'])->get();
        $visitorRole->syncPermissions($permissions);


    }
}
