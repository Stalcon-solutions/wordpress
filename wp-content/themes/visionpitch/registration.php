<?php
add_action('admin_menu', 'ForumReportPageContent');
function ForumReportPageContent()
{
    add_menu_page('Registration Report', 'Registration Report', 'manage_options', 'form_reports.php', 'subscription_forum_report_function', 'dashicons-screenoptions');
}
function subscription_forum_report_function()
{
?>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <script>
        let BASE_URL = '<?php echo  site_url(); ?>';
    </script>

    <style>
        thead {
            border: 1px solid;
        }
    </style>
    <?php
    global $wpdb;
    $tblSubscription = 'wp_registration_form';
    ?>

    <div class="wrap">
        <h1>Form Report/Status</h1>
        <?php
        $tblSubscription = $wpdb->get_results("SELECT * FROM $tblSubscription");

        ?>
        <div class="row m-0 mt-3">
            <div class="col-md-12 page_content_text pl-0 table-responsive" id="main_table_print">
                <table class="display  table table-striped tabel-bordered text-center">

                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Organisation</th>
                            <th>Message No</th>
                            <th>Timestamp</th>

                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $count = 1;
                        $tblSubscription =  array_reverse($tblSubscription);
                        if (!empty($tblSubscription)) {

                            foreach ($tblSubscription as $tableReguVal) {
                        ?>
                                <tr>
                                    <td><?php echo $count; ?></td>
                                    <td><?php echo $tableReguVal->first_name; ?></td>
                                    <td><?php echo $tableReguVal->last_name; ?></td>
                                    <td><?php echo $tableReguVal->email; ?></td>
                                    <td><?php echo $tableReguVal->phone_no; ?></td>

                                    <td><?php echo $tableReguVal->organisation; ?></td>
                                    <td><?php echo $tableReguVal->message; ?></td>
                                    <td><?php echo $tableReguVal->timestamp; ?></td>



                                </tr>
                        <?php
                                $count++;
                            }
                        }
                        ?>
                    </tbody>







                </table>

            </div>
        </div>


    <?php } ?>